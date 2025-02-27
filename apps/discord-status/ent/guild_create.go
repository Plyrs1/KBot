// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"
	"errors"
	"fmt"

	"entgo.io/ent/dialect"
	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
	"github.com/kbot-discord/kbot/apps/discord-status/ent/guild"
)

// GuildCreate is the builder for creating a Guild entity.
type GuildCreate struct {
	config
	mutation *GuildMutation
	hooks    []Hook
	conflict []sql.ConflictOption
}

// SetWebhookdID sets the "webhookd_id" field.
func (gc *GuildCreate) SetWebhookdID(s string) *GuildCreate {
	gc.mutation.SetWebhookdID(s)
	return gc
}

// SetWebhookdToken sets the "webhookd_token" field.
func (gc *GuildCreate) SetWebhookdToken(s string) *GuildCreate {
	gc.mutation.SetWebhookdToken(s)
	return gc
}

// SetID sets the "id" field.
func (gc *GuildCreate) SetID(s string) *GuildCreate {
	gc.mutation.SetID(s)
	return gc
}

// Mutation returns the GuildMutation object of the builder.
func (gc *GuildCreate) Mutation() *GuildMutation {
	return gc.mutation
}

// Save creates the Guild in the database.
func (gc *GuildCreate) Save(ctx context.Context) (*Guild, error) {
	return withHooks(ctx, gc.sqlSave, gc.mutation, gc.hooks)
}

// SaveX calls Save and panics if Save returns an error.
func (gc *GuildCreate) SaveX(ctx context.Context) *Guild {
	v, err := gc.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Exec executes the query.
func (gc *GuildCreate) Exec(ctx context.Context) error {
	_, err := gc.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (gc *GuildCreate) ExecX(ctx context.Context) {
	if err := gc.Exec(ctx); err != nil {
		panic(err)
	}
}

// check runs all checks and user-defined validators on the builder.
func (gc *GuildCreate) check() error {
	if _, ok := gc.mutation.WebhookdID(); !ok {
		return &ValidationError{Name: "webhookd_id", err: errors.New(`ent: missing required field "Guild.webhookd_id"`)}
	}
	if _, ok := gc.mutation.WebhookdToken(); !ok {
		return &ValidationError{Name: "webhookd_token", err: errors.New(`ent: missing required field "Guild.webhookd_token"`)}
	}
	return nil
}

func (gc *GuildCreate) sqlSave(ctx context.Context) (*Guild, error) {
	if err := gc.check(); err != nil {
		return nil, err
	}
	_node, _spec := gc.createSpec()
	if err := sqlgraph.CreateNode(ctx, gc.driver, _spec); err != nil {
		if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{msg: err.Error(), wrap: err}
		}
		return nil, err
	}
	if _spec.ID.Value != nil {
		if id, ok := _spec.ID.Value.(string); ok {
			_node.ID = id
		} else {
			return nil, fmt.Errorf("unexpected Guild.ID type: %T", _spec.ID.Value)
		}
	}
	gc.mutation.id = &_node.ID
	gc.mutation.done = true
	return _node, nil
}

func (gc *GuildCreate) createSpec() (*Guild, *sqlgraph.CreateSpec) {
	var (
		_node = &Guild{config: gc.config}
		_spec = sqlgraph.NewCreateSpec(guild.Table, sqlgraph.NewFieldSpec(guild.FieldID, field.TypeString))
	)
	_spec.OnConflict = gc.conflict
	if id, ok := gc.mutation.ID(); ok {
		_node.ID = id
		_spec.ID.Value = id
	}
	if value, ok := gc.mutation.WebhookdID(); ok {
		_spec.SetField(guild.FieldWebhookdID, field.TypeString, value)
		_node.WebhookdID = value
	}
	if value, ok := gc.mutation.WebhookdToken(); ok {
		_spec.SetField(guild.FieldWebhookdToken, field.TypeString, value)
		_node.WebhookdToken = value
	}
	return _node, _spec
}

// OnConflict allows configuring the `ON CONFLICT` / `ON DUPLICATE KEY` clause
// of the `INSERT` statement. For example:
//
//	client.Guild.Create().
//		SetWebhookdID(v).
//		OnConflict(
//			// Update the row with the new values
//			// the was proposed for insertion.
//			sql.ResolveWithNewValues(),
//		).
//		// Override some of the fields with custom
//		// update values.
//		Update(func(u *ent.GuildUpsert) {
//			SetWebhookdID(v+v).
//		}).
//		Exec(ctx)
func (gc *GuildCreate) OnConflict(opts ...sql.ConflictOption) *GuildUpsertOne {
	gc.conflict = opts
	return &GuildUpsertOne{
		create: gc,
	}
}

// OnConflictColumns calls `OnConflict` and configures the columns
// as conflict target. Using this option is equivalent to using:
//
//	client.Guild.Create().
//		OnConflict(sql.ConflictColumns(columns...)).
//		Exec(ctx)
func (gc *GuildCreate) OnConflictColumns(columns ...string) *GuildUpsertOne {
	gc.conflict = append(gc.conflict, sql.ConflictColumns(columns...))
	return &GuildUpsertOne{
		create: gc,
	}
}

type (
	// GuildUpsertOne is the builder for "upsert"-ing
	//  one Guild node.
	GuildUpsertOne struct {
		create *GuildCreate
	}

	// GuildUpsert is the "OnConflict" setter.
	GuildUpsert struct {
		*sql.UpdateSet
	}
)

// SetWebhookdID sets the "webhookd_id" field.
func (u *GuildUpsert) SetWebhookdID(v string) *GuildUpsert {
	u.Set(guild.FieldWebhookdID, v)
	return u
}

// UpdateWebhookdID sets the "webhookd_id" field to the value that was provided on create.
func (u *GuildUpsert) UpdateWebhookdID() *GuildUpsert {
	u.SetExcluded(guild.FieldWebhookdID)
	return u
}

// SetWebhookdToken sets the "webhookd_token" field.
func (u *GuildUpsert) SetWebhookdToken(v string) *GuildUpsert {
	u.Set(guild.FieldWebhookdToken, v)
	return u
}

// UpdateWebhookdToken sets the "webhookd_token" field to the value that was provided on create.
func (u *GuildUpsert) UpdateWebhookdToken() *GuildUpsert {
	u.SetExcluded(guild.FieldWebhookdToken)
	return u
}

// UpdateNewValues updates the mutable fields using the new values that were set on create except the ID field.
// Using this option is equivalent to using:
//
//	client.Guild.Create().
//		OnConflict(
//			sql.ResolveWithNewValues(),
//			sql.ResolveWith(func(u *sql.UpdateSet) {
//				u.SetIgnore(guild.FieldID)
//			}),
//		).
//		Exec(ctx)
func (u *GuildUpsertOne) UpdateNewValues() *GuildUpsertOne {
	u.create.conflict = append(u.create.conflict, sql.ResolveWithNewValues())
	u.create.conflict = append(u.create.conflict, sql.ResolveWith(func(s *sql.UpdateSet) {
		if _, exists := u.create.mutation.ID(); exists {
			s.SetIgnore(guild.FieldID)
		}
	}))
	return u
}

// Ignore sets each column to itself in case of conflict.
// Using this option is equivalent to using:
//
//	client.Guild.Create().
//	    OnConflict(sql.ResolveWithIgnore()).
//	    Exec(ctx)
func (u *GuildUpsertOne) Ignore() *GuildUpsertOne {
	u.create.conflict = append(u.create.conflict, sql.ResolveWithIgnore())
	return u
}

// DoNothing configures the conflict_action to `DO NOTHING`.
// Supported only by SQLite and PostgreSQL.
func (u *GuildUpsertOne) DoNothing() *GuildUpsertOne {
	u.create.conflict = append(u.create.conflict, sql.DoNothing())
	return u
}

// Update allows overriding fields `UPDATE` values. See the GuildCreate.OnConflict
// documentation for more info.
func (u *GuildUpsertOne) Update(set func(*GuildUpsert)) *GuildUpsertOne {
	u.create.conflict = append(u.create.conflict, sql.ResolveWith(func(update *sql.UpdateSet) {
		set(&GuildUpsert{UpdateSet: update})
	}))
	return u
}

// SetWebhookdID sets the "webhookd_id" field.
func (u *GuildUpsertOne) SetWebhookdID(v string) *GuildUpsertOne {
	return u.Update(func(s *GuildUpsert) {
		s.SetWebhookdID(v)
	})
}

// UpdateWebhookdID sets the "webhookd_id" field to the value that was provided on create.
func (u *GuildUpsertOne) UpdateWebhookdID() *GuildUpsertOne {
	return u.Update(func(s *GuildUpsert) {
		s.UpdateWebhookdID()
	})
}

// SetWebhookdToken sets the "webhookd_token" field.
func (u *GuildUpsertOne) SetWebhookdToken(v string) *GuildUpsertOne {
	return u.Update(func(s *GuildUpsert) {
		s.SetWebhookdToken(v)
	})
}

// UpdateWebhookdToken sets the "webhookd_token" field to the value that was provided on create.
func (u *GuildUpsertOne) UpdateWebhookdToken() *GuildUpsertOne {
	return u.Update(func(s *GuildUpsert) {
		s.UpdateWebhookdToken()
	})
}

// Exec executes the query.
func (u *GuildUpsertOne) Exec(ctx context.Context) error {
	if len(u.create.conflict) == 0 {
		return errors.New("ent: missing options for GuildCreate.OnConflict")
	}
	return u.create.Exec(ctx)
}

// ExecX is like Exec, but panics if an error occurs.
func (u *GuildUpsertOne) ExecX(ctx context.Context) {
	if err := u.create.Exec(ctx); err != nil {
		panic(err)
	}
}

// Exec executes the UPSERT query and returns the inserted/updated ID.
func (u *GuildUpsertOne) ID(ctx context.Context) (id string, err error) {
	if u.create.driver.Dialect() == dialect.MySQL {
		// In case of "ON CONFLICT", there is no way to get back non-numeric ID
		// fields from the database since MySQL does not support the RETURNING clause.
		return id, errors.New("ent: GuildUpsertOne.ID is not supported by MySQL driver. Use GuildUpsertOne.Exec instead")
	}
	node, err := u.create.Save(ctx)
	if err != nil {
		return id, err
	}
	return node.ID, nil
}

// IDX is like ID, but panics if an error occurs.
func (u *GuildUpsertOne) IDX(ctx context.Context) string {
	id, err := u.ID(ctx)
	if err != nil {
		panic(err)
	}
	return id
}

// GuildCreateBulk is the builder for creating many Guild entities in bulk.
type GuildCreateBulk struct {
	config
	builders []*GuildCreate
	conflict []sql.ConflictOption
}

// Save creates the Guild entities in the database.
func (gcb *GuildCreateBulk) Save(ctx context.Context) ([]*Guild, error) {
	specs := make([]*sqlgraph.CreateSpec, len(gcb.builders))
	nodes := make([]*Guild, len(gcb.builders))
	mutators := make([]Mutator, len(gcb.builders))
	for i := range gcb.builders {
		func(i int, root context.Context) {
			builder := gcb.builders[i]
			var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
				mutation, ok := m.(*GuildMutation)
				if !ok {
					return nil, fmt.Errorf("unexpected mutation type %T", m)
				}
				if err := builder.check(); err != nil {
					return nil, err
				}
				builder.mutation = mutation
				var err error
				nodes[i], specs[i] = builder.createSpec()
				if i < len(mutators)-1 {
					_, err = mutators[i+1].Mutate(root, gcb.builders[i+1].mutation)
				} else {
					spec := &sqlgraph.BatchCreateSpec{Nodes: specs}
					spec.OnConflict = gcb.conflict
					// Invoke the actual operation on the latest mutation in the chain.
					if err = sqlgraph.BatchCreate(ctx, gcb.driver, spec); err != nil {
						if sqlgraph.IsConstraintError(err) {
							err = &ConstraintError{msg: err.Error(), wrap: err}
						}
					}
				}
				if err != nil {
					return nil, err
				}
				mutation.id = &nodes[i].ID
				mutation.done = true
				return nodes[i], nil
			})
			for i := len(builder.hooks) - 1; i >= 0; i-- {
				mut = builder.hooks[i](mut)
			}
			mutators[i] = mut
		}(i, ctx)
	}
	if len(mutators) > 0 {
		if _, err := mutators[0].Mutate(ctx, gcb.builders[0].mutation); err != nil {
			return nil, err
		}
	}
	return nodes, nil
}

// SaveX is like Save, but panics if an error occurs.
func (gcb *GuildCreateBulk) SaveX(ctx context.Context) []*Guild {
	v, err := gcb.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Exec executes the query.
func (gcb *GuildCreateBulk) Exec(ctx context.Context) error {
	_, err := gcb.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (gcb *GuildCreateBulk) ExecX(ctx context.Context) {
	if err := gcb.Exec(ctx); err != nil {
		panic(err)
	}
}

// OnConflict allows configuring the `ON CONFLICT` / `ON DUPLICATE KEY` clause
// of the `INSERT` statement. For example:
//
//	client.Guild.CreateBulk(builders...).
//		OnConflict(
//			// Update the row with the new values
//			// the was proposed for insertion.
//			sql.ResolveWithNewValues(),
//		).
//		// Override some of the fields with custom
//		// update values.
//		Update(func(u *ent.GuildUpsert) {
//			SetWebhookdID(v+v).
//		}).
//		Exec(ctx)
func (gcb *GuildCreateBulk) OnConflict(opts ...sql.ConflictOption) *GuildUpsertBulk {
	gcb.conflict = opts
	return &GuildUpsertBulk{
		create: gcb,
	}
}

// OnConflictColumns calls `OnConflict` and configures the columns
// as conflict target. Using this option is equivalent to using:
//
//	client.Guild.Create().
//		OnConflict(sql.ConflictColumns(columns...)).
//		Exec(ctx)
func (gcb *GuildCreateBulk) OnConflictColumns(columns ...string) *GuildUpsertBulk {
	gcb.conflict = append(gcb.conflict, sql.ConflictColumns(columns...))
	return &GuildUpsertBulk{
		create: gcb,
	}
}

// GuildUpsertBulk is the builder for "upsert"-ing
// a bulk of Guild nodes.
type GuildUpsertBulk struct {
	create *GuildCreateBulk
}

// UpdateNewValues updates the mutable fields using the new values that
// were set on create. Using this option is equivalent to using:
//
//	client.Guild.Create().
//		OnConflict(
//			sql.ResolveWithNewValues(),
//			sql.ResolveWith(func(u *sql.UpdateSet) {
//				u.SetIgnore(guild.FieldID)
//			}),
//		).
//		Exec(ctx)
func (u *GuildUpsertBulk) UpdateNewValues() *GuildUpsertBulk {
	u.create.conflict = append(u.create.conflict, sql.ResolveWithNewValues())
	u.create.conflict = append(u.create.conflict, sql.ResolveWith(func(s *sql.UpdateSet) {
		for _, b := range u.create.builders {
			if _, exists := b.mutation.ID(); exists {
				s.SetIgnore(guild.FieldID)
			}
		}
	}))
	return u
}

// Ignore sets each column to itself in case of conflict.
// Using this option is equivalent to using:
//
//	client.Guild.Create().
//		OnConflict(sql.ResolveWithIgnore()).
//		Exec(ctx)
func (u *GuildUpsertBulk) Ignore() *GuildUpsertBulk {
	u.create.conflict = append(u.create.conflict, sql.ResolveWithIgnore())
	return u
}

// DoNothing configures the conflict_action to `DO NOTHING`.
// Supported only by SQLite and PostgreSQL.
func (u *GuildUpsertBulk) DoNothing() *GuildUpsertBulk {
	u.create.conflict = append(u.create.conflict, sql.DoNothing())
	return u
}

// Update allows overriding fields `UPDATE` values. See the GuildCreateBulk.OnConflict
// documentation for more info.
func (u *GuildUpsertBulk) Update(set func(*GuildUpsert)) *GuildUpsertBulk {
	u.create.conflict = append(u.create.conflict, sql.ResolveWith(func(update *sql.UpdateSet) {
		set(&GuildUpsert{UpdateSet: update})
	}))
	return u
}

// SetWebhookdID sets the "webhookd_id" field.
func (u *GuildUpsertBulk) SetWebhookdID(v string) *GuildUpsertBulk {
	return u.Update(func(s *GuildUpsert) {
		s.SetWebhookdID(v)
	})
}

// UpdateWebhookdID sets the "webhookd_id" field to the value that was provided on create.
func (u *GuildUpsertBulk) UpdateWebhookdID() *GuildUpsertBulk {
	return u.Update(func(s *GuildUpsert) {
		s.UpdateWebhookdID()
	})
}

// SetWebhookdToken sets the "webhookd_token" field.
func (u *GuildUpsertBulk) SetWebhookdToken(v string) *GuildUpsertBulk {
	return u.Update(func(s *GuildUpsert) {
		s.SetWebhookdToken(v)
	})
}

// UpdateWebhookdToken sets the "webhookd_token" field to the value that was provided on create.
func (u *GuildUpsertBulk) UpdateWebhookdToken() *GuildUpsertBulk {
	return u.Update(func(s *GuildUpsert) {
		s.UpdateWebhookdToken()
	})
}

// Exec executes the query.
func (u *GuildUpsertBulk) Exec(ctx context.Context) error {
	for i, b := range u.create.builders {
		if len(b.conflict) != 0 {
			return fmt.Errorf("ent: OnConflict was set for builder %d. Set it on the GuildCreateBulk instead", i)
		}
	}
	if len(u.create.conflict) == 0 {
		return errors.New("ent: missing options for GuildCreateBulk.OnConflict")
	}
	return u.create.Exec(ctx)
}

// ExecX is like Exec, but panics if an error occurs.
func (u *GuildUpsertBulk) ExecX(ctx context.Context) {
	if err := u.create.Exec(ctx); err != nil {
		panic(err)
	}
}
