# App GymPass

## Requisitos Funcionais
- [x] Deve ser possível se cadastrar
- [ ] Deve ser possível se autenticar
- [ ] Deve ser possível obter o perfil de um usuário logado
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário logado
- [ ] Deve ser possível o usuário obter o histórico de check-ins
- [ ] Deve ser possível o usuário buscar a academias próximas
- [ ] Deve ser possível o usuário buscar academias pelo nome
- [ ] Deve ser possível o usuário realizar check-in em uma academia
- [ ] Deve ser possível validar o check-in de um usuário
- [ ] Deve ser possível cadastras uma academia

## Regras de Negócios
- [x] O usuário não deve cadastras com um e-mail já utilizado
- [ ] O usuário não pode fazer 2 check-ins no mesmo dia
- [ ] O usuário não pode fazer check-in se não estiver perto (100m) da academia
- [ ] O check-in só pode ser validado até 20 minutos após criado
- [ ] O check-in só pode ser validade por administradores
- [ ] A academia só pode ser cadastrada por administradores

## Requisitos Não-Funcionais
- [x] A senha do usuário precisa estar criptografada
- [x] Os dados da aplicação precisam estar persistidas em um Banco de Dados
- [ ] Todas as listas de dados precisão estar paginadas com 20 items por página
- [ ] O usuário deve ser identificado por um JWT