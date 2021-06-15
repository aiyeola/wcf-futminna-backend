import { hash, verify } from 'argon2';

/** Class representing password utility. */
class Password {
  /**
   * Generates a new password.
   * @param {object} data - User details.
   * @returns {object} A new password.
   */
  constructor(data) {
    this.password = data.password;
  }

  /**
   * Encrypts the password.
   * @returns {string} newPassword.
   */
  encryptPassword = async () => {
    return await hash(this.password);
  };

  /**
   * Checks if the password matches.
   * @param {string} password - password.
   * @param {string} hashedPassword - hashedPassword.
   * @returns {function} newPassword.
   */
  static checkPasswordMatch = async (hashedPassword, password) => {
    return await verify(hashedPassword, password);
  };
}

export default Password;
