class User {
  constructor({ id, name, email, role, created_at }) {
    this.id = id;
    this.name = name;
    this.email = email;
    if (role) {
      this.role = role;
    }
    if (created_at) {
      this.created_at = created_at;
    }
  }
}

class Content {
  constructor({ id, title, body, user, created_at }) {
    this.id = id;
    this.title = title;
    this.body = body;

    if (user) {
      this.user = user;
    }
    if (created_at) {
      this.created_at = created_at;
    }
  }
}

class Role {
  constructor({ id, name }) {
    this.id = id;
    this.name = name;
  }
}

class Category {
  constructor({ id, name }) {
    this.id = id;
    this.name = name;
  }
}

class Content_Category {
  constructor({ id, content, category }) {
    this.id = id;
    this.content = content;
    this.category = category;
  }
}

module.exports = {
  User,
  Content,
  Role,
  Category,
  Content_Category
};
