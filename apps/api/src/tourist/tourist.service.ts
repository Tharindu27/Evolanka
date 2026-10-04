import { Injectable } from '@nestjs/common';
import { CreateTouristDto } from './dto/create-tourist.dto';
import { UpdateTouristDto } from './dto/update-tourist.dto';

@Injectable()
export class TouristService {
  create(createTouristDto: CreateTouristDto) {
    return 'This action adds a new tourist';
  }

  findAll() {
    return `This action returns all tourist`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tourist`;
  }

  update(id: number, updateTouristDto: UpdateTouristDto) {
    return `This action updates a #${id} tourist`;
  }

  remove(id: number) {
    return `This action removes a #${id} tourist`;
  }
}
