from signal import Handlers
import discord
from discord.ext import commands 
import random
from Handlers import JsonHandler

TOKEN = "OTk5NDQ1ODE2ODEwOTM4NDI5.GUYD3l.Lk6cjhhe_5XvLnfBkiVlWTpvIDIo3AlBIuhFbY"

client = discord.Client()

@client.event
async def on_ready():
    print("I have logged in as {0.user}".format(client))

@bot.command(name='ssu')
async def _ssu(ctx):
    

client.run(JsonHandler.getToken())