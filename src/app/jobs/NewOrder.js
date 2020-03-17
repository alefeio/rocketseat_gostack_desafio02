import Mail from '../../lib/Mail';

class NewOrder {
  get key() {
    return 'NewOrder';
  }

  async handle({ data }) {
    // desestruturando para pegar os dados do email
    const { entregador, email, produto } = data;

    await Mail.sendMail({
      to: `${entregador} <${email}>`,
      subject: 'Nova Encomenda',
      template: 'order',
      context: {
        entregador,
        produto,
      },
    });
  }
}

export default new NewOrder();
