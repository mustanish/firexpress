module.exports = {
  create: {
    query: {
      text: 'INSERT INTO groups(name, created_by, updated_by) VALUES($1, $2, $3) RETURNING uuid'
    },
    messages: {
      name: {
        empty: 'Please enter group name',
        min: 'Group name must be at least {#limit} characters long',
        max: 'Group name must be at most {#limit} characters long',
        required: 'Group name cannot empty'
      },
      members: {
        empty: 'Please enter group members',
        pattern: 'Please enter members in specified format',
        required: 'Group members cannot empty'
      }
    }
  },
  all: {
    query: {
      text:
        "SELECT name, 'https://baseurl/' || uuid AS icon FROM groups WHERE created_by=$1 AND deleted=FALSE ORDER BY name LIMIT $2 OFFSET $3"
    }
  },
  delete: {
    query: {
      text: 'UPDATE groups SET deleted=$1 WHERE uuid=$2 RETURNING uuid'
    }
  },
  single: {
    query: {
      text:
        "SELECT name, 'https://baseurl/' || uuid AS icon FROM groups WHERE uuid=$1 AND deleted=FALSE"
    }
  }
};
