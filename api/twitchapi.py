import json, os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from twitchAPI.twitch import Twitch
from pydantic import BaseModel


class User(BaseModel):
    username: str

app = FastAPI()

origins = [
    "https://followage.com",
    "https://www.followage.com",
    "https://api.followage.com",
    "followage.com",
    "www.followage.com",
    "api.followage.com"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post('/search/')
async def main(user: User):
    data = build_data_obj(user.username)
    return json.dumps(data)


# create instance of twitch API
def twitch_api():
    twitch = Twitch(os.environ['CLIENT_ID'], os.environ['CLIENT_SECRET'])
    twitch.authenticate_app([])
    return twitch

# get ID of user
def get_user(username):
    try:
        twitch = twitch_api()
        user_info = check_returned_data(twitch.get_users(logins=[username]))
        return user_info
    except Exception as error:
        print('get_user() Error: ', error)

# list of IDs of followed users
def get_followed_channels(username, cursor = None, followed_channels = None):
    try:
        twitch = twitch_api()
        user_data = check_returned_data(get_user(username))
        user_id = user_data['data'][0]['id']

        if followed_channels is None:
            followed_channels = []

        if cursor is not None:
            res = check_returned_data(twitch.get_users_follows(after=cursor, first=100, from_id=user_id))
            for user in res['data']:
                followed_channels.append(user)
            if 'cursor' in res['pagination']:
                get_followed_channels(username, cursor=res['pagination']['cursor'], followed_channels=followed_channels)
        else:
            res = check_returned_data(twitch.get_users_follows(first=100, from_id=user_id))
            for user in res['data']:
                followed_channels.append(user)
            if 'cursor' in res['pagination']:
                get_followed_channels(username, cursor=res['pagination']['cursor'], followed_channels=followed_channels)
        return followed_channels
    except Exception as error:
        print('get_followed_channels() Error: ', error)

# build data object
def build_data_obj(username):
    try:
        # initialize the twitch api
        twitch = twitch_api()
        user_id_list = []
        data_list = []
        # chunk size used to form the breakdown_list
        n = 100

        # api call to get followed channels of specfied user
        followed_channels = get_followed_channels(username=username)

        # for each followed channel, grab the to_id value (the id of the followed channel/user)
        # append the to_id to the user_id_list
        for id in followed_channels:
            user_id_list.append(id['to_id'])

        # breakdown the user_id_list into chunks of 100 (n)
        # these chunks are used in the get_users api call
        breakdown_list = [user_id_list[i:i + n] for i in range(0, len(user_id_list), n)]

        # loop through the breakdown_list (i is the index of each id in the list)
        for i in range(len(breakdown_list)):
            # api call to get users using breakdown_list
            res = twitch.get_users(user_ids=breakdown_list[i])

            # loop through each user object in the response data
            for user_obj in res['data']:
                # loop through the channels in the followed_channels response (that first api call made above)
                for channel in followed_channels:
                    # if the to_id in the channel is equal to the id in the user object, proceed
                    if channel['to_id'] == user_obj['id']:
                        # update the user object (really a python dictionary, but yeah) with the followed_at date from the channel object
                        user_obj.update({'followed_at': channel['followed_at']})
                        # append the updated user object to the data_list
                        data_list.append(user_obj)

        return data_list
    except Exception as error:
        print('build_data_obj() Error: ', error)
        data_list = [{'data': 'error'}]
        return data_list

def check_returned_data(response_object):
    if response_object['data'] != []:
        return response_object
    else:
        raise ValueError('Twitch response object is empty')