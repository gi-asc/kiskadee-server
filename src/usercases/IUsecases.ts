export interface IUsecase {
    execute(data: any): Promise<any> 
}