# Stage 1 - base
FROM node:alpine AS base

WORKDIR /code

ARG NUXT_FIREBASE_API_KEY
ENV VITE_FIREBASE_API_KEY=$NUXT_FIREBASE_API_KEY
RUN echo "VITE_FIREBASE_API_KEY=$NUXT_FIREBASE_API_KEY" >> /code/.env

ARG NUXT_FIREBASE_AUTH_DOMAIN
ENV VITE_FIREBASE_AUTH_DOMAIN=$NUXT_FIREBASE_AUTH_DOMAIN
RUN echo "VITE_FIREBASE_AUTH_DOMAIN=$NUXT_FIREBASE_AUTH_DOMAIN" >> /code/.env

ARG NUXT_FIREBASE_PROJECT_ID
ENV VITE_FIREBASE_PROJECT_ID=$NUXT_FIREBASE_PROJECT_ID
RUN echo "VITE_FIREBASE_PROJECT_ID=$NUXT_FIREBASE_PROJECT_ID" >> /code/.env

ARG NUXT_FIREBASE_STORAGE_BUCKET
ENV VITE_FIREBASE_STORAGE_BUCKET=$NUXT_FIREBASE_STORAGE_BUCKET
RUN echo "VITE_FIREBASE_STORAGE_BUCKET=$NUXT_FIREBASE_STORAGE_BUCKET" >> /code/.env

ARG NUXT_FIREBASE_MESSAGE_SENDER_ID
ENV VITE_FIREBASE_STORAGE_BUCKET=$NUXT_FIREBASE_STORAGE_BUCKET
RUN echo "VITE_FIREBASE_MESSAGE_SENDER_ID=$NUXT_FIREBASE_MESSAGE_SENDER_ID" >> /code/.env

ARG NUXT_FIREBASE_APP_ID
ENV VITE_FIREBASE_APP_ID=$NUXT_FIREBASE_APP_ID
RUN echo "VITE_FIREBASE_APP_ID=$NUXT_FIREBASE_APP_ID" >> /code/.env

ARG NUXT_FIREBASE_MEASUREMENT_ID
ENV VITE_FIREBASE_APP_ID=$NUXT_FIREBASE_APP_ID
RUN echo "VITE_FIREBASE_MEASUREMENT_ID=$NUXT_FIREBASE_MEASUREMENT_ID" >> /code/.env

ARG NUXT_PUBLIC_HOST
ENV VITE_PUBLIC_HOST=$NUXT_PUBLIC_HOST
RUN echo "VITE_PUBLIC_HOST=$NUXT_PUBLIC_HOST" >> /code/.env

ARG NUXT_PUBLIC_BASE_URL_API
ENV NUXT_PUBLIC_BASE_URL_API=$NUXT_PUBLIC_BASE_URL_API
RUN echo "NUXT_PUBLIC_BASE_URL_API=$NUXT_PUBLIC_BASE_URL_API" >> /code/.env


# Stage 2 - builder
FROM base AS builder

WORKDIR /code

COPY package*.json ./

COPY ./ ./

COPY --from=base /code/.env /code/.env

RUN npm install

RUN npm run build

# Stage 3 - run
FROM base AS final

RUN apk add --no-cache \
    git \
    wget curl \
    nginx \
    supervisor

WORKDIR /code

ADD package.json ./
ADD nuxt.config.ts ./
ADD .docker/nuxt/nginx-app.conf ./

COPY --from=builder /code/.output /code/.output
COPY --from=builder /code/node_modules /code/node_modules
COPY --from=builder /code/.env /code/.env

RUN \
    # copy nginx site config \
    mv ./nginx-app.conf /etc/nginx/nginx.conf

EXPOSE 3000

CMD [ "node", ".output/server/index.mjs" ]
