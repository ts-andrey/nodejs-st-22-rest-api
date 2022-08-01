export interface Repository<
  IdType,
  FilterDTOType,
  CreateDTOType,
  UpdateDTOType,
> {
  findById(id: IdType): any;
  findAll(filterDTO: FilterDTOType): any;
  create(createDTO: CreateDTOType): any;
  update(id: IdType, updateDTO: UpdateDTOType): any;
  delete(id: IdType): any;
}
