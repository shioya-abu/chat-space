class GroupsController < ApplicationController
  def new
    
  end

  def create
    Group.create(group_params)
    redirect_to "/"
  end

  def edit
    
  end

  def update
    
  end

  private

  def group_params
    params.require(:group).permit(:name).merge(user_id: current_user.id)
  end
end
