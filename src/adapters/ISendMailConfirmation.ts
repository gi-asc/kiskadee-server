
export interface ISendMailConfirmation {
    sendMail(to: string, message: string): Promise<void>;
}
