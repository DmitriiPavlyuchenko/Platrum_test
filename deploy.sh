set -e

npm run build

cd dist

git init
git add -A
git commit -m "New deployment"

git push -f git@github.com:DmitriiPavlyuchenko/Platrum_test.git master:gh-pages

cd -
