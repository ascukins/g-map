ng build --prod --base-href "https://ascukins.github.io/"

xcopy C:\Users\ascukins\projects\g-map\dist\map1\*.* C:\Users\ascukins\projects\ascukins.github.io /S /R /Y

cd C:\Users\ascukins\projects\ascukins.github.io

git add *

git commit -a -m "g-map prod"

git push

cd C:\Users\ascukins\projects\g-map
