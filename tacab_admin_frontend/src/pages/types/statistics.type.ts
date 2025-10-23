export interface statistics {
  ok:   boolean;
  data: Datum[];
}

export interface Datum {
  date:  string;
  total: number;
}