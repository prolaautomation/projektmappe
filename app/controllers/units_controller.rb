class UnitsController < ApplicationController
  # Auflistung aller Units pro Teilanlage
  # GET /project/:project_id/subsystems/:subsystem_id/units
  def index
    @subsystem = Subsystem.find(params[:subsystem_id])
    @project = @subsystem.project
    @units = @subsystem.units

    respond_to do |format|
      format.html
      format.csv { send_data @units.to_csv, filename: "units-#{Date.today}.csv" }
    end
  end

  # Control logic for create-view
  # GET /project/:project_id/subsystems/:subsystem_id/units/new
  def new
    # build a 'temporary' post which is written to DB later (create-method)
    @unit = Unit.new
  end

  # Control logic when creating a new unit
  # POST /project/:project_id/subsystems/:subsystem_id/units
  def create
    @unit = Unit.new(unit_params)
    # write unit to database
    if @unit.save
      redirect_to project_subsystem_path(:project_id => @unit.subsystem.project.id, :id => @unit.subsystem.id),
                  :notice => 'Teilanlage erfolgreich erstellt.'
    else
      render 'new'
    end
  end

  # Control logic for show-view
  # GET /project/:project_id/subsystems/:subsystem_id/units/:id
  def show
    @unit = Unit.find(params[:id])
    @subsystem = @unit.subsystem
    @project = @subsystem.project
  end

  # Control logic for edit-view
  # GET /project/:project_id/subsystems/:subsystem_id/units/:id/edit
  def edit
    @unit = Unit.find(params[:id])
    @subsystem = @unit.subsystem
    @project = @subsystem.project
  end

  # Save an updated unit
  # This method is either called from the unit edit-view (GET /units/:id/edit)
  # or the unit filter-view (GET /units/:id/filter)
  # PUT /project/:project_id/subsystems/:subsystem_id/units/:id
  def update
    @unit = Unit.find(params[:id])
    if @unit.update(unit_params)
      redirect_to project_subsystem_path(:project_id => @unit.subsystem.project.id,
                                          :id => @unit.subsystem.id),
                  :notice => 'Unit erfolgreich aktualisiert.'
    else
      render 'edit'
    end
  end

  # Delete a unit
  # DELETE /project/:project_id/subsystems/:subsystem_id/units/:id
  def destroy
    @unit = Unit.find(params[:id])
    projectid = @unit.subsystem.project.id
    subsystemid = @unit.subsystem.id
    @unit.destroy
    redirect_to project_subsystem_path(:project_id => projectid,
                                        :id => subsystemid), :notice => 'Unit wurde gelöscht.'
  end

  private
  # defines which parameters have to be provided by the form when creating a new unit
  def unit_params
    params.require(:unit).permit(:name, :subsystem_id)
  end
end
