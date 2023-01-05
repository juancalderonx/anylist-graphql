import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { ItemsService } from './items.service';
import { Item } from './entities/item.entity';
import { Logger, ParseUUIDPipe } from '@nestjs/common';
import { CreateItemInput, UpdateItemInput } from './dto/inputs';

@Resolver(() => Item)
export class ItemsResolver {

  private readonly logger = new Logger(ItemsResolver.name);

  constructor(
    private readonly itemsService: ItemsService
  ) {}

  @Mutation(() => Item)
  async createItem(@Args('itemDto') itemDto: CreateItemInput): Promise<Item> {
    this.logger.log(`Mutation | Trying to create a new item.`);

    return this.itemsService.create(itemDto);
  }

  @Query(() => [Item], { name: 'items' })
  async findAll(): Promise<Item[]> {
    this.logger.log(`Query | Trying to return all items.`);
    return this.itemsService.findAll();
  }

  @Query(() => Item, { name: 'item' })
  async findOne(@Args('id', { type: () => ID }, ParseUUIDPipe ) id: string): Promise<Item> {
    this.logger.log(`Query | Trying to find one item by ID.`);
    return this.itemsService.findOne(id);
  }

  @Mutation(() => Item)
  updateItem(@Args('updateItemInput') updateItemInput: UpdateItemInput) {
    this.logger.log(`Mutation | Trying to update item by ID.`);
    return this.itemsService.update(updateItemInput.id, updateItemInput);
  }

  @Mutation(() => Item)
  removeItem(@Args('id', { type: () => Int }) id: number) {
    this.logger.log(`Mutation | Trying to delete an item by id.`);
    return this.itemsService.remove(id);
  }
}
