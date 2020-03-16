import * as Yup from 'yup';
import Deliveryman from '../models/Deliveryman';

class DeliverymanController {
  async index(req, res) {
    const deliverymans = await Deliveryman.findAll();

    return res.json(deliverymans);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ erro: 'Falha na validação!' });
    }

    const { email } = req.body;

    const deliveryManExists = await Deliveryman.findOne({
      where: { email },
    });

    if (deliveryManExists) {
      return res.status(400).json({ erro: 'Entregador já está cadastrado!' });
    }

    const { id, name } = await Deliveryman.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ erro: 'Falha ao validar!' });
    }

    const { email } = req.body;

    const deliveryman = await Deliveryman.findByPk(req.params.id);

    if (email && email !== deliveryman.email) {
      const deliverymanExists = await Deliveryman.findOne({ where: { email } });

      if (deliverymanExists) {
        return res.status(400).json({ erro: 'Entregador já existe!' });
      }
    }

    const { id, name } = await deliveryman.update(req.body);

    res.json({
      id,
      name,
      email,
    });
  }

  async delete(req, res) {
    const delivery = await Deliveryman.destroy({
      where: { id: req.params.id },
    });

    return res.json();
  }
}

export default new DeliverymanController();
