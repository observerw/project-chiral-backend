openapi-generator generate \
    -g typescript-axios \
    -i http://localhost:4001/api-json \
    -o src/api/graph-api \
    --additional-properties=supportsES6=true,useSingleRequestParameter=true,stringEnums=true
