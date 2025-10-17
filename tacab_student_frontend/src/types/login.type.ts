export interface ILoginResponse {
    success: boolean;
    message: string;
    result: Result[];
}

export interface Result {
    sub: string;
    marks: string;
}

export interface ILoginBody {
    id: string;
    pass: string;
}