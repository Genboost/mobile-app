export interface NamedEntity {
    text: string;   
    explanations: {
        [key: string]: string;
    };
}

export interface Api {
  getRhese: (text: string) => Promise<Array<string>>;
  getNamedEntity: (text: string) => Promise<Array<NamedEntity>>;
}
