# Url Shortener

*Work in progress*

# Getting started

### Install and run the API:

  - `cd api/ && npm i`
  - `npm run start`

### Install and run the UI

 - `cd ui/ && && npm i`
 - `npm run start`

# UI Tasks`

- Start: `npm run start`
- Build: `npm run build`
- Test: `npm run test`
- Eject: `npm run eject`

# API Tasks

- Start: `npm run start`
- Watch: `npm run watch`
- Eject: `npm run stop`
- Tail Logs: `npm run logs`

### Run Integration Tests

- Start Test Server: `npm run test:start`
- Build: `npm run build`
- Run Tests: `npm run test`
- Stop Test Server: `npm run eject`

### Routes

POST /shorten

```
}
  status: 200,
  data: { 
    hash: 'dGtwyU',
    shortUrl: 'http://localhost:8889/dGtwyU'
  }
}
```

GET /info/:hash

```
}
  status: 200,
  data: { 
    url: 'https://github.com',
    hash: 'dGtwyU',
    shortUrl: 'http://localhost:8889/dGtwyU',
    createdAt: '1487092587',
  }
}
```

DELETE /remove

```
}
  status: 200,
  data: { 
    hash: 'dGtwyU',
    deletedAt: '1487092587',
  }
}
```

PUT /update/:hash

```
}
  status: 200,
  data: { 
    hash: 'dGtwyU',
    url: 'https://github.com',
  }
}
```