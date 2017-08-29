{
    "preLoadTables": {
        "publishers": "select accountid, id from publishers"
    },
    "type": "object",
    "memQuery": "select accountid, id from publishers where accountid is not null",
    "keyField": "accountid",
    "refField": "id",
    "fields": [{
        "type": "object",
        "memQuery": "select id, accountid from publishers where id = ?",
        "fields": [{
            "dbName": "id",
            "name": "publisher_id",
            "type": "string"
        }]
    }]
}