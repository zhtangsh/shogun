VERSION=$(cat package.json | grep version | head -1 | awk -F= "{ print $2 }" | sed 's/[version:,\",]//g' | tr -d '[[:space:]]')
SHORT_SHA=$(git rev-parse --short HEAD)
yarn build
echo "build image 192.168.1.50:29006/zhtangsh/shogun:$VERSION.$SHORT_SHA"
docker build . -t 192.168.1.50:29006/zhtangsh/shogun:$VERSION.$SHORT_SHA
docker push 192.168.1.50:29006/zhtangsh/shogun:$VERSION.$SHORT_SHA