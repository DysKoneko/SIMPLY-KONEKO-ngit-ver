This theme supports Discord RPC.

Make sure you have Python 3 installed.

Go to this folder on cmd. And run this command to install some requirements:
pip3 install -r requirements.txt

Then just run rpc.py:
python3 rpc.py

============================================
Please exit the script using CTRL+C so that the game knows that the console is exiting.

Don't want specific folders or files showing up?
Check config.ini's [Blacklisted]. The format for adding is same as ITG's AdditionalFolders, just put a comma between those.


If you want to use the Discord RPC script for other themes, see:
Scripts/External.lua (needs Scripts/Melody.lua)
Screens/Overlay/Scripts.xml (Screen Change, External Handler Timer, External Handler Updater, Discord RPC)