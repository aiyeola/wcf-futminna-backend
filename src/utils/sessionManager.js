import jwt from 'jsonwebtoken';
import redis from 'redis';
import { promisify } from 'util';

import Response from 'utils/response';

const redisClient =
  process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test'
    ? redis.createClient(process.env.REDIS_URL)
    : redis.createClient();

const getAsync = promisify(redisClient.get).bind(redisClient);
const delAsync = promisify(redisClient.del).bind(redisClient);

redisClient
  .on('connect', () => console.log('redis connected'))
  .on('error', (error) => console.log(error));

/** Class managing user sessions */
export default class SessionManager {
  /**
   * Generates a jwt token.
   * @param {object} data - User details.
   * @returns {string} token.
   */
  static generateToken = (data) => {
    const token = jwt.sign(
      {
        id: data.id,
        username: data.username,
        isAdmin: data.isAdmin,
        refreshKey: data.refreshKey,
      },
      process.env.TOKEN_SECRET,
      { expiresIn: '24hr' },
    );
    return token;
  };

  /**
   * Creates a redis session
   * @param {object} data - User details.
   * @param {object} res - response object.
   * @returns {string} token.
   */
  static createSession = (data, res) => {
    const { username } = data;

    const result = this.checkToken(username);

    const token =
      result === 'null'
        ? Response.conflictError(res, "token doesn't exist")
        : this.generateToken(data);

    redisClient.set(username, token, 'EX', 60 * 60 * 24);
    return token;
  };

  /**
   * Checks if token is in use
   * @param {string} userEmail - User email.
   * @returns {string} result.
   */
  static checkToken = async (username) => await getAsync(username);

  /**
   * Decodes a token
   * @param {object} data - User details.
   * @returns {object} User object
   */
  static decodeToken = (data) => {
    try {
      return jwt.verify(data.token, process.env.TOKEN_SECRET);
    } catch (error) {
      throw error;
    }
  };

  /**
   * Destroys a token.
   * @param {object} data - User details
   * @returns {number} result - 0 || 1 (deleted)
   */
  static destroyToken = async (data) => delAsync(data.username);
}
