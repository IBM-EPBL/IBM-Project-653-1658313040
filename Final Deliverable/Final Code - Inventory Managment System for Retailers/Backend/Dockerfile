FROM python:2.7
  LABEL maintainer="312019104007@smartinternz.com, 312019104007@smartinternz.com"
  RUN apt-get update
  RUN mkdir /app
  WORKDIR /app
  COPY . /app
  RUN pip install -r requirements.txt
  EXPOSE 5000
  ENTRYPOINT [ "python" ]
  CMD [ "app.py" ]