# Backend
FROM python:3.9.4-slim

RUN pip3 install fastapi
RUN pip3 install uvicorn[standard]
RUN pip3 install twitchAPI
RUN pip3 install pydantic

WORKDIR /app

COPY . ./

EXPOSE 8000

CMD ["uvicorn", "twitchapi:app", "--host", "0.0.0.0", "--port", "8000"]