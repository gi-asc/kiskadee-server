import { AppError } from "../../errors/AppError"
import { CreateUser } from "../../usercases/createUser"

const user = {
    id: 'validId',
    name: 'validName',
    isConfirmed: true,
    email: 'validMail',
    password: 'validPassword',
    userName: 'validUserName',
    tokenConfirmation: 'validToken'
}

const createUserSut = new CreateUser(
    { create: async (data) => user   
    },
    { execute: async () => true},
    { encrypt: async ()=> 'validHash',
      compare: async ()=> true    
    },
    { sendMail: async () => {}}
)

describe('create user', ()=>{
    it('Should create user be able correct datas', async () =>{
        const data = {
            email: 'validMail',
            userName: 'validUserName',
            password: 'validPassword',
            name: 'validName'
        }
        const response = await createUserSut.execute(data)
        expect(response).toBe(user)
    })

        it('Should create user reject incorrectDatas', async () =>{
        const data = {
            userName: 'validUserName',
            password: 'validPassword',
            name: 'validName'
        }
        const response = createUserSut.execute(data)
        expect(response).rejects.toThrow()
    })
})