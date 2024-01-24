class PlanEntity {
  id: number;
  jsonData: string;

  constructor(id: number, jsonData: string) {
    this.id = id;
    this.jsonData = jsonData;
  }
}

export { PlanEntity };
