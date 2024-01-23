import {BehaviorSubject, firstValueFrom, Observable} from "rxjs";

export class ComponentStore<T> {
  private _dataStore: BehaviorSubject<T>;
  private readonly _dataStore$: Observable<T>;
  constructor(private dataInit: T) {
    this._dataStore = new BehaviorSubject<T>(dataInit);
    this._dataStore$ = this._dataStore.asObservable();
  }

  protected get() {
    return this._dataStore.getValue();
  }

  async select(handleEvent: (data: T) => void) {
    const result: Awaited<T> = await firstValueFrom(this._dataStore$);
    return handleEvent(result);
  }

  get data(){
    return this._dataStore$;
  }

  patchState(param: any){
    this._dataStore.next({...this.dataInit, ...param});
    return this;
  }
}
