# App GymPass

## Requisitos Funcionais
- [x] Deve ser possível se cadastrar
- [x] Deve ser possível se autenticar
- [x] Deve ser possível obter o perfil de um usuário logado
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado
- [x] Deve ser possível o usuário obter o histórico de check-ins
- [x] Deve ser possível o usuário buscar a academias próximas (até 10Km)
- [x] Deve ser possível o usuário buscar academias pelo nome
- [x] Deve ser possível o usuário realizar check-in em uma academia
- [x] Deve ser possível validar o check-in de um usuário
- [x] Deve ser possível cadastras uma academia

## Regras de Negócios
- [x] O usuário não deve cadastras com um e-mail já utilizado
- [x] O usuário não pode fazer 2 check-ins no mesmo dia
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia
- [x] O check-in só pode ser validado até 20 minutos após criado
- [x] O check-in só pode ser validado por administradores
- [x] A academia só pode ser cadastrada por administradores


## Requisitos Não-Funcionais
- [x] A senha do  usuário precisa estar criptografada
- [x] Os dados da  aplicação precisam estar persistidas em um Banco de Dados
- [x] Todas as listas de dados precisão estar paginadas com 20 items por página
- [x] O usuário deve ser identificado por um JWT