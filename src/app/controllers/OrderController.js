import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore } from 'date-fns';


import Deliveryman from '../models/Deliveryman';
import NewOrder from '../jobs/NewOrder';
import Queue from '../../lib/Queue';

class OrderController {
  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ erro: 'Falha na validação!' });
    }

    const { deliveryman_id, product } = req.body;

    const deliveryman = await Deliveryman.findByPk(deliveryman_id);

    // enviando email
    await Queue.add(NewOrder.key, {
      entregador: deliveryman.name,
      email: deliveryman.email,
      produto: product,
    });

    return res.json({
      deliveryman,
      product
    });
  }
}

export default new OrderController();
