FROM python:3.10-bullseye
RUN python -m pip install --upgrade pip
WORKDIR /app
COPY requirements.txt requirements.txt
COPY main.py main.py
COPY models.py models.py
COPY authenticator.py authenticator.py
COPY acls.py acls.py

COPY queries queries
COPY routers routers
COPY tests tests
COPY migrations migrations

RUN python -m pip install -r requirements.txt

# CMD uvicorn main:app --host 0.0.0.0 --port 80 --forwarded-allow-ips "*"
CMD python -m migrations up && uvicorn main:app --host 0.0.0.0 --port 80
