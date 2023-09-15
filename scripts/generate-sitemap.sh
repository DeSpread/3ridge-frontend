cd ..
cd script

echo "robots.txt 생성중 ... "
node robots
echo "robots.txt 생성 왼료"

echo "sitemap 생성중 ... "
node sitemap-common
echo "sitemap 생성 완료 ... "

echo "sitemap gzip 압축중"
node sitemap-compress
node sitemap
echo "sitemap 압축 완료"

#curl http://google.com/ping?sitemap=https://www.3ridge.io/sitemap.xml
