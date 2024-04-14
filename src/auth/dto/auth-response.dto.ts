import { UserDTO } from 'src/user/dto/user.dto';

export class AuthenticationResponse {
  user: UserDTO;
  accessToken: string;
}
