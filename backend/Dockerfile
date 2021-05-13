FROM python:3.8-slim-buster

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
RUN python -m nltk.downloader punkt
RUN python -m nltk.downloader stopwords

COPY . .

CMD [ "python3", "api.py"]