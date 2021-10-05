export interface AuthenticationResponse {
    readonly jwt: string
    readonly id: string,
    readonly username: string
    readonly accepted: boolean
}