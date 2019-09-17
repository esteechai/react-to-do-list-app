package api 

import(
    "encoding/json"
    "net/http"
)


var items = []*Item{}

//Item representing the to-do
type Item struct{
ID string `json:"item_name"`
Name string `json:item_desc"`
}

func addItemHandler(w http.ResponseWriter, r *http.Request) {
    item := &Item{}
    json.NewDecoder(r.Body).Decode(item)
    items = append(items, item)
}
