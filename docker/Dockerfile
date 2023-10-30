FROM node:19-alpine3.16

# アプリケーションディレクトリ
WORKDIR /usr/src/app

# アプリケーションの依存関係をインストールする
# ワイルドカードを使用して、package.json と package-lock.json の両方がコピーされるようにする
COPY ./package*.json ./
RUN yarn install
COPY . ./

RUN yarn run build

EXPOSE 3000
