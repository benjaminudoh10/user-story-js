> User Story API using express, typescript and typeorm

## Steps to run the server
1. Clone the repository.
2. Download `node`.
3. Run `npm install`.
4. Run `npm run dev` to start up the server.
5. Run `npm run test` to run tests.

## API endpoints

### [`POST`] `/api/v1/register`

1.  A user is created by going to `/api/v1/register` endpoint.
2.  The response from the above api endpoint is a json object that contains `api_key` key.
3.  This `api_key` is a uuid generated by `typeorm` whenever a user is created.
4.  This `api_key` is passed as a header with key `X-STORY-AUTH` and is used for authorization.
4.  Every user has a role which could be either `user` (default) or `admin`.

Returns the newly created user object.

Example payload to create a user with `user` role:
{
	"name": "Ben",
	"email": "ben@gmail.com",
	"password": "benisaguy",
	"role": "user" // optional
}

Example payload to create a user with `admin` role:
{
	"name": "Ben Admin",
	"email": "benadmin@gmail.com",
	"password": "benisaguyadmin",
	"role": "admin"
}


### [`POST`] `/api/v1/story`

1. A story is created for a user by going to this endpoint.
2. The user is detected from the `X-STORY-AUTH` header.
3. A reference to the user object is also stored on the story object.

Returns the newly created story object.

Example payload to create a story for a user:
{
	"name": "Best",
	"summary": "First story",
	"description": "A very touching story",
	"type": "bug",
	"complexity": "np-hard",
	"cost": 60,
	"eta": "2019-11-12"
}


### [`GET`] `/api/v1/stories`

1. List all stories that are not inactive which belongs to the user with the `api_key` from the header.

Returns an array of story objects.


### [`PUT`] `/api/v1/story/:id/assign`

1. This endpoint assigns the story with the given `id` to an admin user for approval.

Returns the modified story object with the property `assigned_for_approval` set to true.


### [`GET`] `/api/v1/stories/admin`

1. This endpoint lists all stories that have been assigned to admin for approval.

Returns an array of stories whose `assigned_for_approval` property is true.


### [`PUT`] `/api/v1/story/:id/:action`

1. This endpoint enables an admin user to either approve or reject the story with the id specified in the url.
2. The `action` parameter can either be `approve` or `reject`.
3. If action is `approve`, and the story with the given id exists, the story's `active` and `approved` property is set to true.
4. If action is `reject`, and the story with the given id exists, the story's `active` and `approved` property is set to false.

Returns a story object.

