import { Api } from "@/domain/Api";

const url = 'https://nsgenboostapiserverdzy6vfrt-container-vibrant-newton.functions.fnc.fr-par.scw.cloud/';

export const Python: Api = {
    getRhese: (text: string) => {
        console.log(text)
        return fetch(`${url}/api/get_rhese`, {
        method: 'POST',
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ text }),
    }).then(res => res.json()).then(json => json.response)},
    getNamedEntity: (text: string) => fetch(`${url}/api/get_entites`, {
        method: 'POST',
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ text }),
    }).then(res => res.json()),
  };