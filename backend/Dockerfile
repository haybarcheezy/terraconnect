FROM python:3.11
WORKDIR /usr/src/app
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# The command that will be run when the container starts
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
