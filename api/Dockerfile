FROM python:3.10-bullseye
RUN python -m pip install --upgrade pip
WORKDIR /app
COPY requirements.txt requirements.txt
COPY main.py main.py
COPY queries.py queries.py
COPY routers.py routers.py
COPY tests.py tests.py
COPY models.py models.py
COPY authenticator.py authenticator.py
COPY acls.py acls.py
COPY migrations migrations
RUN python -m pip install -r requirements.txt
# CMD uvicorn main:app --host 0.0.0.0 --port 80 --forwarded-allow-ips "*"
CMD python -m migrations up && uvicorn main:app --host 0.0.0.0 --port 80
