class SwitchgearcombinationsController < ApplicationController

  def index
    @switchgearcombinations = Switchgearcombination.all
  end

  # Control logic for create-view
  # GET /switchgearcombinations/new
  def new
    # build a 'temporary' post which is written to DB later (create-method)
    @switchgearcombination = Switchgearcombination.new
  end

  # Control logic when creating a new switchgearcombination
  # POST /switchgearcombinations
  def create
    @switchgearcombination = Switchgearcombination.new(switchgearcombination_params)

    # write switchgearcombination to database
    if @switchgearcombination.save
      redirect_to switchgearcombinations_path, :notice => 'Schaltgerätekombination erfolgreich erstellt.'
    else
      render 'new'
    end
  end

  # Control logic for show-view
  # GET /switchgearcombinations/:id
  def show
    @switchgearcombination = Switchgearcombination.find(params[:id])
  end

  # Control logic for edit-view
  # GET /switchgearcombinations/:id/edit
  def edit
    @switchgearcombination = Switchgearcombination.find(params[:id])
  end

  # Save an updated switchgearcombination
  # PUT /switchgearcombinations/:id
  def update
    @switchgearcombination = Switchgearcombination.find(params[:id])
    if @switchgearcombination.update(switchgearcombination_params)
      redirect_to switchgearcombinations_path, :notice => 'Schaltgerätekombination erfolgreich aktualisiert.'
    else
      render 'edit'
    end
  end

  # Delete a switchgearcombination
  # DELETE /switchgearcombinations/:id
  def destroy
    @switchgearcombination = Switchgearcombination.find(params[:id])
    @switchgearcombination.destroy
    redirect_to switchgearcombinations_path, :notice => 'Schaltgerätekombination wurde gelöscht.'
  end

  private
  # defines which parameters have to be provided by the form when creating a new switchgearcombination
  def switchgearcombination_params
    params.require(:switchgearcombination).permit!
  end
end