BASE=/home/samson

NEED_UPDATE=false

updateRepo() {
	git fetch
	LOCAL=$(git rev-parse HEAD)
	REMOTE=$(git rev-parse @{u})
	if [ $LOCAL == $REMOTE ]; then
		NEED_UPDATE=false
	else
		NEED_UPDATE=true
	fi
	git pull
}

PASSWORD=None

getPassword() {
	if [ $PASSWORD = None ]; then
		echo "Enter sudo password:"
		read -s PASSWORD
	fi
}

echo Beginning update...

cd $BASE/dicebot
echo Updating dicebot...
updateRepo
if [ $NEED_UPDATE = true ]; then
	getPassword
	echo $PASSWORD | sudo -S systemctl restart sam-dicebot
fi

cd $BASE/quotebot
echo Updating quotebot...
updateRepo
if [ $NEED_UPDATE = true ]; then
	getPassword
	echo $PASSWORD | sudo -S systemctl restart sam-quotebot
fi

cd $BASE/website/equithon-game
echo Updating equithon-game...
updateRepo

cd $BASE/website/math-website
echo Updating math-website...
updateRepo

cd $BASE/website/shooty-game
echo Updating shooty-game...
updateRepo
if [ $NEED_UPDATE = true ]; then
	getPassword
	echo $PASSWORD | sudo -S systemctl restart sam-shooty-game
fi

cd $BASE/website/solar-colony
echo Updating solar-colony...
updateRepo
if [ $NEED_UPDATE = true ]; then
	getPassword
	echo $PASSWORD | sudo -S systemctl restart sam-solar-colony
fi

cd $BASE/website/space-game
echo Updating space-game...
updateRepo
if [ $NEED_UPDATE = true ]; then
	getPassword
	echo $PASSWORD | sudo -S systemctl restart sam-space-game
fi

cd $BASE/website/web-remote-soundboard
echo Updating web-remote-soundboard...
updateRepo
if [ $NEED_UPDATE = true ]; then
	getPassword
	echo $PASSWORD | sudo -S systemctl restart sam-web-remote-soundboard
fi

cd $BASE/website
echo Updating website...
updateRepo
if [ $NEED_UPDATE = true ]; then
	getPassword
	echo $PASSWORD | sudo -S systemctl restart lighttpd
	echo $PASSWORD | sudo -S systemctl restart sam-website-update
fi

echo Update completed!

