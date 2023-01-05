import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateItemInput, UpdateItemInput } from './dto/inputs';

@Injectable()
export class ItemsService {

  private readonly logger = new Logger(ItemsService.name);

  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>
  ){}

  async create(itemDto: CreateItemInput): Promise<Item> {
    this.logger.log(`Service | Returning a item created.`);

    const newItem = this.itemsRepository.create(itemDto);
    return await this.itemsRepository.save(newItem);
  }

  async findAll(): Promise<Item[]> {
    // TODO: Pagination, filters with args...
    this.logger.log(`Service | Returning all items.`);
    return this.itemsRepository.find();
  }

  async findOne(id: string): Promise<Item> {
    const item = await this.itemsRepository.findOneBy({id: id});

    if(!item) {
      this.logger.error(`Service | Error: Item with id ${id} not found.`);
      throw new NotFoundException(`Error: Item with id ${id} not found.`);
    }

    this.logger.log(`Service | Returning item with id '${id}'`);
    return item;
  }

  async update(id: string, updateItemInput: UpdateItemInput): Promise<Item> {
    const item = await this.itemsRepository.preload(updateItemInput);

    if(!item) throw new NotFoundException(`Item with id ${id} not found`);

    return this.itemsRepository.save(item);
  }

  async removeSoft(id: string): Promise<Item> {

    // TODO: Referencial integrity

    const item = await this.findOne(id);
    item.status = 'erased';
    return this.itemsRepository.save(item);
  }

  async remove(id: string): Promise<Item> {
    const item = await this.findOne(id);
    await this.itemsRepository.delete(item);
    return item;
  }
}
