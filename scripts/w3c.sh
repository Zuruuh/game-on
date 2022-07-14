curl -sH "Content-Type: text/html; charset=utf-8" \
    --data-binary @$1 \
    https://validator.w3.org/nu/?out=gnu
