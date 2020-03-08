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
  update: {
    query: {
      text: 'UPDATE groups SET name=$1, desc=$2 WHERE uuid= $3 RETURNING uuid'
    },
    messages: {
      name: {
        empty: 'Please enter group name',
        min: 'Group name must be at least {#limit} characters long',
        max: 'Group name must be at most {#limit} characters long'
      },
      desc: {
        empty: 'Please enter group description',
        min: 'Group description must be at least {#limit} characters long',
        max: 'Group description must be at most {#limit} characters long'
      }
    }
  },
  remove: {
    query: {
      text:
        "UPDATE groups SET deleted=$1 WHERE uuid=$2 RETURNING name, 'https://baseurl/' || uuid AS icon"
    }
  },
  single: {
    query: {
      text:
        "SELECT name, 'https://baseurl/' || uuid AS icon FROM groups WHERE uuid=$1 AND deleted=FALSE"
    }
  },
  all: {
    query: {
      text:
        "SELECT name, 'https://baseurl/' || uuid AS icon FROM groups WHERE created_by=$1 AND deleted=FALSE ORDER BY name LIMIT $2 OFFSET $3"
    },
    messages: {
      page: {
        invalid: 'Invalid type, the page must be a number',
        positive: 'Invalid page, the page must be positive'
      },
      perPage: {
        invalid: 'Invalid type, the perPage must be a number',
        positive: 'Invalid perPage, the perPage must be positive'
      }
    }
  },
  common: {
    messages: {
      invalidId: 'Please enter groupId in specified format'
    }
  }
};
