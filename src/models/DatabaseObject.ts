import config from "@config"
import pg from "pg"
const db = new pg.Pool({
	host: config.database.oxbot.host,
	database: config.database.oxbot.database,
	user: config.database.oxbot.username,
	password: config.database.oxbot.password,
	port: 5432,
	ssl: true
})

export type DatabaseObjectMapping<ObjectInterface> = {
  [K in keyof ObjectInterface]: ObjectInterface[K] extends object
    ? Record<keyof ObjectInterface[K], string>
    : string
}

export interface DatabaseObjectInfos<ObjectInterface> {
  /** The Table to use */ table: string
  /** The Mapping to use */ mapping: DatabaseObjectMapping<ObjectInterface>
}

export type DatabaseObjectControl<ObjectInterface, SearchInterface> = ObjectInterface & {
  /** Control of the Object */ '@': DatabaseObject<ObjectInterface, SearchInterface>
}


export default class DatabaseObject<ObjectInterface, SearchInterface> {
  public data: ObjectInterface
  protected default: ObjectInterface
  protected where: Partial<SearchInterface>
  protected infos: DatabaseObjectInfos<ObjectInterface>

  /** Use an Object Matching the Search */
  async useControl(
    /** The Search of this Object */ search: Partial<SearchInterface>
  ): Promise<DatabaseObjectControl<ObjectInterface, SearchInterface>> {
    let iteration = 0, whereIteration = 0
    const whereClause = Object.keys(search).map(
      (key) => `${key} = $${++iteration}` + (++whereIteration === Object.keys(search).length ? '' : ' and '))

    this.where = search
    const { rows }
      = await db.query(`select * from ${this.infos.table} where ${whereClause.join('')} limit 1`, [
        ...Object.keys(search).map((key) => search[key])
      ])

    if (rows.length > 0) this.data = this.mapColumnsToObject(rows[0])
    else this.data = this.default
    return { '@': this, ...this.data }
  }

  /** Save an Object */
  async save() {
    let iteration = 0, updateIteration = 0, whereIteration = 0
    const updateData = this.mapObjectToColumns(this.data)
    const updateClause = Object.keys(updateData).map(
      (key) => `${key} = $${++iteration}` + (++updateIteration === Object.keys(updateData).length ? '' : ', '))
    const whereClause = Object.keys(this.where).map(
      (key) => `${key} = $${++iteration}` + (++whereIteration === Object.keys(this.where).length ? '' : ' and '))

    return await db.query(`update ${this.infos.table} set ${updateClause.join('')} where ${whereClause.join('')}`, [
      ...Object.keys(updateData).map((key) => updateData[key]),
      ...Object.keys(this.where).map((key) => this.where[key])
    ])
  }

  /** Update an Object Matching the Search */
  async update(
    /** The new Data of this Object */ data: Partial<ObjectInterface>
  ) {
    let iteration = 0, updateIteration = 0, whereIteration = 0
    const updateData = this.mapObjectToColumns(data)
    const updateClause = Object.keys(updateData).map(
      (key) => `${key} = $${++iteration}` + (++updateIteration === Object.keys(updateData).length ? '' : ', '))
    const whereClause = Object.keys(this.where).map(
      (key) => `${key} = $${++iteration}` + (++whereIteration === Object.keys(this.where).length ? '' : ' and '))

    return await db.query(`update ${this.infos.table} set ${updateClause.join('')} where ${whereClause.join('')}`, [
      ...Object.keys(updateData).map((key) => updateData[key]),
      ...Object.keys(this.where).map((key) => this.where[key])
    ])
  }

  /** Delete an Object */
  async delete() {
    let iteration = 0, whereIteration = 0
    const whereClause = Object.keys(this.where).map(
      (key) => `${key} = $${++iteration}` + (++whereIteration === Object.keys(this.where).length ? '' : ' and '))

    return await db.query(`delete from ${this.infos.table} where ${whereClause.join('')}`, [
      ...Object.keys(this.where).map((key) => this.where[key])
    ])
  }


  private mapObjectToColumns(object: Partial<ObjectInterface>): Record<string, any> {
    const result: Record<string, any> = {}
    Object.keys(object).forEach((key) => {
      if (typeof this.infos.mapping[key] === 'object') {
        Object.keys(this.infos.mapping[key]).forEach((k) => {
          result[this.infos.mapping[key][k]] = object[key][k]
        })
      } else result[this.infos.mapping[key]] = object[key]
    }); return result
  }

  private mapColumnsToObject(columns: Record<string, any>): ObjectInterface {
    const result: any = {}
    Object.keys(this.infos.mapping).forEach((key) => {
      if (key in columns) result[key] = columns[key]
      else if (typeof this.infos.mapping[key] === 'object') {
        result[key] = {}
        Object.keys(this.infos.mapping[key]).forEach((k) => {
          if (k in columns) result[key][k] = columns[k]
          else result[key][k] = columns[this.infos.mapping[key][k]]
        })
      } else result[key] = columns[this.infos.mapping[key]]
    }); return result
  }
}