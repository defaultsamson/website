BASE=/home/samson

echo Beginning update...

cd $BASE/dicebot
echo Updating dicebot...
git pull

cd $BASE/quotebot
echo Updating quotebot...
git pull

cd $BASE/website
echo Updating website...
git pull

cd $BASE/website/equithon-game
echo Updating equithon-game...
git pull

cd $BASE/website/math-website
echo Updating math-website...
git pull

cd $BASE/website/shooty-game
echo Updating shooty-game...
git pull

cd $BASE/website/solar-colony
echo Updating solar-colony...
git pull

cd $BASE/website/space-game
echo Updating space-game...
git pull

cd $BASE/website/web-remote-soundboard
echo Updating web-remote-soundboard...
git pull

echo Update completed!

