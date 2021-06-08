class Users {
  constructor({ userId, password, email, createdAt, updatedAt }) {
    this.userId = userId;
    this.email = email;
    this.password = password;
    if (updatedAt) {
      this.updatedAt = updatedAt;
    }
    if (createdAt) {
      this.createdAt = createdAt;
    }
  }
}

module.exports = {
  Users,
};
